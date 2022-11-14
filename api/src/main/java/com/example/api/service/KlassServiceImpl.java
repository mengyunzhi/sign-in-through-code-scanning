package com.example.api.service;

import com.example.api.entity.Klass;
import com.example.api.entity.Term;
import com.example.api.repository.KlassRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Objects;

@Service
public class KlassServiceImpl implements KlassService {

    private final KlassRepository klassRepository;

    @Autowired
    public KlassServiceImpl(KlassRepository klassRepository) {
        this.klassRepository = klassRepository;
    }

    @Override
    public Klass save(String name, Long entrance_date, Short length) {
        Assert.notNull(name, "name不能为null");
        Assert.notNull(entrance_date, "entrance_date不能为null");
        Assert.notNull(length, "length不能为null");
        Klass klass = new Klass();
        klass.setName(name);
        klass.setEntrance_date(entrance_date);
        klass.setLength(length);
        return this.klassRepository.save(klass);
    }

    @Override
    public Page findAll(String searchName, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "pageable不能为null");
        return this.klassRepository.findAll(searchName, pageable);
    }

    @Override
    public void deleteById(@NotNull Long id) {
        Assert.notNull(id, "id不能为null");
        this.klassRepository.deleteById(id);
    }

    @Override
    public String clazzNameUnique(Long id, String name) {
        Klass klass = this.klassRepository.findByName(name);
        if (klass != null && !Objects.equals(klass.getId(), id)) {
            return "名称已存在";
        }
        return "名称合理";
    }

    @Override
    public Klass findById(Long id) {
        Assert.notNull(id, "id不能为null");
        return this.klassRepository.findById(id).get();
    }

    @Override
    public Klass update(Long id, Klass klass) {
        Klass oldKlass = this.klassRepository.findById(id).get();
        return this.updateFields(klass, oldKlass);
    }

    Klass updateFields(Klass newKlass, Klass oldKlass) {
        oldKlass.setName(newKlass.getName());
        oldKlass.setEntrance_date(newKlass.getEntrance_date());
        oldKlass.setLength(newKlass.getLength());
        return this.klassRepository.save(oldKlass);
    }
}
