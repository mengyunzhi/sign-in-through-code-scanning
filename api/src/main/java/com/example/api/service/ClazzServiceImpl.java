package com.example.api.service;

import com.example.api.entity.Clazz;
import com.example.api.repository.ClazzRepository;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Objects;

@Service
public class ClazzServiceImpl implements ClazzService {

    private final ClazzRepository clazzRepository;

    @Autowired
    public ClazzServiceImpl(ClazzRepository clazzRepository) {
        this.clazzRepository = clazzRepository;
    }

    @Override
    public Clazz save(String name, Long entrance_date, Short length) {
        Assert.notNull(name, "name不能为null");
        Assert.notNull(entrance_date, "entrance_date不能为null");
        Assert.notNull(length, "length不能为null");
        Clazz clazz = new Clazz();
        clazz.setName(name);
        clazz.setEntrance_date(entrance_date);
        clazz.setLength(length);
        return this.clazzRepository.save(clazz);
    }

    @Override
    public Page findAll(String searchName, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "pageable不能为null");
        return this.clazzRepository.findAll(searchName, pageable);
    }

    @Override
    public void deleteById(@NotNull Long id) {
        Assert.notNull(id, "id不能为null");
        this.clazzRepository.deleteById(id);
    }

    @Override
    public String clazzNameUnique(Long id, String name) {
        Clazz clazz = this.clazzRepository.findByName(name);
        if (clazz != null && !Objects.equals(clazz.getId(), id)) {
            return "名称已存在";
        }
        return "名称合理";
    }

    @Override
    public Clazz findById(Long id) {
        Assert.notNull(id, "id不能为null");
        return this.clazzRepository.findById(id).get();
    }

    @Override
    public Clazz update(Long id, Clazz clazz) {
        Clazz oldClazz = this.clazzRepository.findById(id).get();
        return this.updateFields(clazz, oldClazz);
    }

    /**
     * 班级选择组件请求数据
     */
    @Override
    public List<Clazz> getAll() {
        return (List<Clazz>) this.clazzRepository.findAll();
    }

    Clazz updateFields(Clazz newClazz, Clazz oldClazz) {
        oldClazz.setName(newClazz.getName());
        oldClazz.setEntrance_date(newClazz.getEntrance_date());
        oldClazz.setLength(newClazz.getLength());
        return this.clazzRepository.save(oldClazz);
    }
}
